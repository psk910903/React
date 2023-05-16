import Container from "./Container";
import Counter from "./Counter";

function App() {
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    // initValue: 10,
  };

  return (
    <Container>
      <div>
        {/* <Counter a={1} b={2} c={3} initValue={10} /> */}
        <Counter {...counterProps} />
      </div>
    </Container>
  );
}

export default App;
