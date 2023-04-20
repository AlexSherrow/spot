export const HomePage = () => {
  let devURL = "http://localhost:8080";
  //let devURL = "http://localhost:3000";
  return (
    <>
    <a href= {devURL + '/Main'}>Main List</a>
    </>
  );
};