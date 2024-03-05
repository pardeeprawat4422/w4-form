import { forwardRef } from "react";

export const Redio = forwardRef((props, ref) => {
  return <input ref={ref} type="redio" className="tool-long-tile" {...props} />;
});
