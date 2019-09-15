import React from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 10;

const dataMachine = new Machine({
  id: "dataMachine",
  initial: "loading",
  context: {
    data: []
  },
  states: {
    loading: {
      invoke: {
        id: "dataLoader",
        src: (context, _event) => {
          return (callback, _onEvent) => {
            setTimeout(() => {
              const { data } = context;
              const newData = allData.slice(data.length, data.length + perPage);
              const hasMore = newData.length === perPage;

              if (hasMore) {
                callback({ type: "DONE_MORE", newData });
              } else {
                callback({ type: "DONE_COMPLETE", newData });
              }
            }, 1000);
          };
        }
      },
      on: {
        DONE_MORE: {
          target: "more",
          actions: assign({
            data: ({ data }, { newData = [] }) => [...data, ...newData]
          })
        },
        DONE_COMPLETE: {
          target: "complete",
          actions: assign({
            data: ({ data }, { newData = [] }) => [...data, ...newData]
          })
        },
        FAIL: "failure"
      }
    },
    more: {
      on: {
        LOAD: "loading"
      }
    },
    complete: { type: "final" },
    failure: { type: "final" }
  }
});

function App() {
  const [current, send] = useMachine(dataMachine);
  const { data } = current.context;

  return (
    <div className="App">
      <ul>
        {data.map(row => (
          <li key={row} style={{ background: "orange" }}>
            {row}
          </li>
        ))}

        {current.matches("loading") && <li>Loading...</li>}

        {current.matches("more") && (
          <li style={{ background: "green" }}>
            <button
              onClick={() => {
                send("LOAD");
              }}
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
