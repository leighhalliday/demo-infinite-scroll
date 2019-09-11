import React from "react";
import "./App.css";

const allData = [];
for (let i = 1; i <= 25; i++) {
  allData.push(i);
}
const perPage = 10;

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "start":
      return { ...state, loading: true };
    case "load":
      const newData = allData.slice(state.after, state.after + perPage);
      return {
        ...state,
        loading: false,
        more: newData.length === perPage,
        after: state.after + perPage,
        data: [...state.data, ...newData]
      };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    data: [],
    after: 0,
    loading: false,
    more: true
  });
  const { data, loading, more } = state;
  const [ref, setRef] = React.useState(null);
  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) {
          return;
        }
        dispatch({ type: "start" });
        dispatch({ type: "load" });
      },
      { threshold: 1.0 }
    )
  );

  React.useEffect(() => {
    const currentRef = ref;
    const currentObserver = observer.current;
    if (currentRef) {
      currentObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef);
      }
    };
  }, [ref]);

  return (
    <div className="App">
      <ul>
        {data.map(row => (
          <li key={row} style={{ height: "50vh", background: "orange" }}>
            {row}
          </li>
        ))}
      </ul>

      {loading && <div>Loading...</div>}

      {!loading && more && (
        <div ref={setRef} style={{ height: "200px", background: "yellow" }}>
          load more
        </div>
      )}
    </div>
  );
}

export default App;
