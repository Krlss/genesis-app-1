import Form from "../components/form";
import Table from "../components/table";

const App = () => {
  return (
    <div className="flex flex-col gap-5 px-10 py-5 overscroll-y-none">
      <Form />
      <Table />
    </div>
  );
}
export default App