import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <div className="home" style={{ marginTop: "60px" }}>
      <MainCarousel />
      <ShoppingList />
    </div>
  );
};

export default Home;
