// lib/persistTransforms.ts
import { createTransform } from "redux-persist";
import type { CounterSliceState } from "./features/counter/counterSlice";

export const counterTransform = createTransform<
  CounterSliceState,
  Omit<CounterSliceState, "status">
>(
  (inboundState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status: _, ...rest } = inboundState; // 'status' alanını yok saymak için '_'
    console.log("Persisting state:", rest);
    return rest;
  },
  (outboundState) => {
    console.log("Rehydrating state:", outboundState);
    return {
      value: outboundState.value ?? 0, // 'value' alanını garanti etmek için varsayılan değer
      status: "idle", // 'status' alanını 'idle' olarak ayarla
    };
  },
  { whitelist: ["counter"] }
);
