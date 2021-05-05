export const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func?.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };
  
  export const COLORS = {
    red: { default: '#FF3366', dim: '#501D2A' },
    yellow: { default: '#FFBB00', dim: '#503F10' },
    blue: { default: '#0088FF', dim: '#103250' },
    green: { default: '#22DD88', dim: '#194832' },
    orange: { default: '#FF8800', dim: '#503210' },
    pink: { default: '#FF0099', dim: '#501037' },
    purple: { default: '#AA44FF', dim: '#3B2150' }
  };
  