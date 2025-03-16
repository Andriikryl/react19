import { Routes, Route } from "react-router";
fetch("http://localhost:3001/users").then((res) => {
  console.log(res);
});
export default function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/:userId/tasks"/>
    </Routes>
  );
}
