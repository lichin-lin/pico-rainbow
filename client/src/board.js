import Peer from "simple-peer";
import React from "react";
import "./App.css";

function Board () {
  React.useEffect(() => {
    // WS
    const ws =
      process.env.NODE_ENV !== "production"
        ? "wss://pico-rainbow.herokuapp.com/"
        : "ws:127.0.0.1:5000";
    const wsConnection = new WebSocket(ws, "json");
    let localId;
    let peerIds;
    let peerConnections = {};
    let initiator = false;
    wsConnection.onopen = (e) => {
      console.log(`wsConnection open to ${ws}`, e);
    };
    wsConnection.onerror = (e) => {
      console.error(`wsConnection error `, e);
    };
    wsConnection.onmessage = (e) => {
      let data = JSON.parse(e.data);
      switch (data.type) {
        case "connection":
          localId = data.id;
          break;
        case "ids":
          peerIds = data.ids;
          connect();
          break;
        case "signal":
          signal(data.id, data.data);
          break;
        default:
          console.log(e);
          break;
      }
    };
    const broadcast = (data) => {
      console.log(peerConnections);
      Object.values(peerConnections).forEach((peer) => {
        try {
          peer.send(data);
        } catch (e) {
          console.log(e);
        }
      });
    };
    const signal = (id, data) => {
      if (peerConnections[id]) {
        peerConnections[id].signal(data);
      }
    };
    function onPeerData(id, data) {
      draw(JSON.parse(data));
    }
    const connect = () => {
      // remove peer connections not in peer ids
      Object.keys(peerConnections).forEach((id) => {
        if (!peerIds.includes(id)) {
          peerConnections[id].destroy();
          delete peerConnections[id];
        }
      });
      if (peerIds.length === 1) {
        initiator = true;
      }
      peerIds.forEach((id) => {
        if (id === localId) {
          return;
        }

        if (peerConnections[id]) {
          return;
        }
        let peer = new Peer({
          initiator: initiator,
        });

        peer.on("error", console.error);
        peer.on("signal", (data) => {
          wsConnection.send(
            JSON.stringify({
              type: "signal",
              id: localId,
              data,
            })
          );
        });
        peer.on("connect", () => {
          console.log(`${localId} now connected to ${id}`);
        });

        peer.on("data", (data) => {
          onPeerData(id, data);
        });

        peerConnections[id] = peer;
      });
    };
    // CANVAS API
    const canvas = document.querySelector("#draw");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 50;
    let isDrawing = false;
    let lastPoint = { x: 0, y: 0 };
    let hue = Math.random() * 200;
    console.log(hue);
    let direction = true;

    const handleMouseEvent = (e) => {
      if (isDrawing) {
        if (!lastPoint) {
          lastPoint = { x: e.offsetX, y: e.offsetY };
          return;
        }

        draw({
          lastPoint,
          x: e.offsetX,
          y: e.offsetY,
          color: hue,
        });

        broadcast(
          JSON.stringify({
            lastPoint,
            x: e.offsetX,
            y: e.offsetY,
            color: hue,
          })
        );
        lastPoint = { x: e.offsetX, y: e.offsetY };
      }
    };
    const handleTouchEvent = (e) => {
      const touches = e.changedTouches;
      const _x = touches[0].clientX;
      const _y = touches[0].clientY;
      if (!lastPoint) {
        lastPoint = { x: _x, y: _y };
        return;
      }
      draw({
        lastPoint,
        x: _x,
        y: _y,
        color: hue,
      });
      broadcast(
        JSON.stringify({
          lastPoint,
          x: _x,
          y: _y,
          color: hue,
        })
      )
      lastPoint = { x: _x, y: _y };
    };

    function draw(data) {
      const { x, y, lastX, lastY, color } = data;
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // hue++;
      // if (hue >= 100) {
      //   hue = 0;
      // }

      if (ctx.lineWidth >= 100 || ctx.lineWidth <= 20) {
        direction = !direction;
      }

      if (direction) {
        ctx.lineWidth++;
      } else {
        ctx.lineWidth--;
      }

      if (direction) {
        hue+= 0.5;
      } else {
        hue-= 0.5;
      }
    }

    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touches = e.changedTouches;
      isDrawing = true;
      // lastX = touches[0].clientX;
      // lastY = touches[0].clientY;
    });
    canvas.addEventListener("touchmove", (e) => handleTouchEvent(e));

    canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDrawing = true;
      canvas.addEventListener("mousemove", handleMouseEvent);
    });

    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("touchend", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
    canvas.addEventListener("touchcancel", () => (isDrawing = false));
  });

  // React.useEffect(() => {
  // }, []);
  return (
    <div className="App">
      <canvas id="draw" width="100vw" height="100vh"></canvas>
    </div>
  );
}

export default Board;
