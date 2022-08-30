import Header from "../../components/Header";
import AddRestaurant from "../../components/AddRestaurant";
import RestaurantList from "../../components/RestaurantList";

const HomePage = () => {

  return (
    <div className="container-xl mb-3">
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default HomePage;
