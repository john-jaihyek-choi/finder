import React from "react";
import Details from "./details";

export default class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: this.props.cardStack,
      details: null,
      index: this.props.index,
      canRewind: false,
      canClick: true,
      showDetails: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.toLikedRestaurant = this.toLikedRestaurant.bind(this);
    this.toCardStack = this.toCardStack.bind(this);
    this.toLocationSetting = this.toLocationSetting.bind(this);
  }

  componentDidMount() {
    if (!this.state.restaurants) this.getRestaurants();
  }

  getRestaurants() {
    if (!this.props.location) return this.setState({ restaurants: [] });
    this.setState({ canClick: false });
    fetch("/api/search/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        term: this.props.currentQuery,
        latitude: this.props.location.lat || null,
        longitude: this.props.location.long || null,
        location: this.props.location.keyword || "",
        radius: this.props.location.radius || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ restaurants: data, canClick: true }))
      .catch((err) => console.error(err));
  }

  getRestaurantDetails(yelpId) {
    fetch(`/api/view/${yelpId}`)
      .then((res) => res.json())
      .then((data) => this.setState({ details: data, showDetails: true }))
      .catch((err) => console.error(err));
  }

  likeRestaurant(yelpId, index) {
    this.setState({ canClick: false });

    fetch(`/api/view/${yelpId}`)
      .then((res) => res.json())
      .then(() => this.setState({ canClick: true }))
      .catch((err) => console.error(err));

    fetch("/api/likedRestaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yelpId }),
    })
      .then((res) => res.json())
      .then(() => {
        const newArr = Array.from(this.state.restaurants);
        newArr.splice(index, 1);
        return this.setState({
          restaurants: newArr,
          index: this.state.index % newArr.length,
          canRewind: false,
          showDetails: false,
        });
      })
      .catch((err) => console.error(err));
  }

  handleClick(e) {
    if (!this.state.canClick) return;
    if (e.currentTarget.id === "like" && this.state.restaurants.length)
      return this.likeRestaurant(
        this.state.restaurants[this.state.index].yelpId,
        this.state.index
      );
    if (e.currentTarget.id === "pass")
      return this.setState({
        index: (this.state.index + 1) % this.state.restaurants.length,
        canRewind: true,
        showDetails: false,
      });
    if (e.currentTarget.id === "rewind" && this.state.canRewind)
      return this.setState({
        index:
          (this.state.index + this.state.restaurants.length - 1) %
          this.state.restaurants.length,
        canRewind: false,
        showDetails: false,
      });
    if (e.currentTarget.id === "details")
      return this.getRestaurantDetails(
        this.state.restaurants[this.state.index].yelpId
      );
    if (e.currentTarget.id === "user-alt") return this.toProfile();
    if (e.currentTarget.id === "likedRes") return this.toLikedRestaurant();
    if (e.currentTarget.id === "arrow-left") return this.toCardStack();
  }

  toLikedRestaurant(e) {
    this.props.saveCardStackPos(this.state.restaurants, this.state.index);
    this.props.getLikedRestaurants();
    this.props.setView("likedRestaurants");
  }

  toCardStack() {
    this.setState({ showDetails: false });
  }

  toProfile() {
    this.props.saveCardStackPos(this.state.restaurants, this.state.index);
    this.props.setView("profile");
  }

  toLocationSetting(event) {
    this.props.setView("locationSettings");
  }

  renderPrice(restaurant) {
    if (!restaurant.price) return <div>No price data</div>;
    const price = [];
    for (let i = 0; i < restaurant.price.length; i++)
      price.push(
        <i className="fas fa-dollar-sign fa-sm mr-1" key={"price" + i}></i>
      );
    return price;
  }

  renderRating(restaurant) {
    if (!restaurant.rating) return <div>No rating data</div>;
    const rating = [];
    for (let i = 0; i < Math.floor(restaurant.rating); i++)
      rating.push(<i className="fas fa-star fa-sm" key={"rating" + i}></i>);
    if (!Number.isInteger(restaurant.rating))
      rating.push(
        <i
          className="fas fa-star-half fa-sm"
          key={"rating" + rating.length}
        ></i>
      );
    return rating;
  }

  renderCard() {
    if (!this.state.restaurants) {
      return (
        <div
          className="w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow"
          style={{ height: "450px" }}
        >
          <h1 className="text-pink text-center font-weight-bold">
            Rendering matches
          </h1>
          <div className="spinner-border text-pink mt-3" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      );
    }

    if (!this.state.restaurants.length) {
      return (
        <div
          className="w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow"
          style={{ height: "450px" }}
        >
          {this.props.locationPermission === "denied" &&
          (!this.props.location || !this.props.location.keyword) ? (
            <>
              <span className="text-pink text-center font-weight-bold">
                Location is currently invalid
              </span>
              <span className="text-pink text-center font-weight-bold">
                Please set a valid location
              </span>
              <br />
              <button onClick={this.toLocationSetting} className="w-75 shadow">
                <span className="text-white text-center font-weight-bold">
                  Location Settings
                </span>
              </button>
            </>
          ) : (
            <h1 className="text-pink text-center font-weight-bold">
              No matches found
            </h1>
          )}
        </div>
      );
    }

    if (this.state.showDetails)
      return (
        <Details
          renderPrice={this.renderPrice}
          renderRating={this.renderRating}
          restaurant={this.state.details}
        />
      );

    return (
      <div
        className="w-75 mx-auto d-flex flex-column align-items-center justify-content-center card rounded shadow font-weight-bold"
        style={{ height: "450px" }}
      >
        <div className="w-100 h-100 text-center text-pink d-flex align-items-center justify-content-center">
          <div className="w-50">
            {this.renderRating(this.state.restaurants[this.state.index])}
          </div>{" "}
          |
          <div className="w-50">
            {this.renderPrice(this.state.restaurants[this.state.index])}
          </div>
        </div>
        <div className="w-100 h-100">
          <img
            className="rounded hover effect1"
            id="details"
            src={this.state.restaurants[this.state.index].storeImageUrl}
            alt={this.state.restaurants[this.state.index].restaurantName}
            onClick={this.handleClick}
            style={{ objectFit: "cover", height: "250px", width: "100%" }}
          />
        </div>
        <div className="w-100 h-100 text-center text-pink font-weight-bold d-flex flex-column align-items-center justify-content-center">
          <div>{this.state.restaurants[this.state.index].restaurantName}</div>
          <div>
            {this.state.restaurants[this.state.index].location.city},{" "}
            {this.state.restaurants[this.state.index].location.state}
          </div>
          <div>
            <i className="fas fa-map-marker-alt mr-2"></i>
            {(
              this.state.restaurants[this.state.index].distance * 0.000621371
            ).toFixed(1)}{" "}
            mi
          </div>
        </div>
      </div>
    );
  }

  render() {
    let icon;
    this.state.showDetails ? (icon = "arrow-left") : (icon = "user-alt");

    return (
      <div
        className="mx-auto vh-100 d-flex flex-column align-items-center"
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <div className="container">
          <div className="flex-row my-5">
            <div className="h-100 mt-4 d-flex align-items-start justify-content-around">
              <div
                className="d-flex align-items-center"
                id={icon}
                onClick={this.handleClick}
              >
                <i className={`fas fa-${icon} fa-2x gray hover`}></i>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-utensils fa-2x text-pink"></i>
              </div>
              <div
                className="d-flex align-items-center"
                id="likedRes"
                onClick={this.handleClick}
              >
                <i className="fas fa-heart fa-2x hover gray"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 w-100">{this.renderCard()}</div>
        <div className="container">
          <div className="flex-row mb-3">
            <div className="h-100 pb-4 d-flex align-items-end justify-content-around">
              <button
                type="button"
                id="pass"
                className="stack-button pink btn button-outline shadow"
                onClick={this.handleClick}
              >
                <i className="fas fa-times fa-lg"></i>
              </button>
              <button
                type="button"
                id="rewind"
                className="stack-button yellow btn button-outline shadow"
                onClick={this.handleClick}
              >
                <i className="fas fa-undo fa-lg"></i>
              </button>
              <button
                type="button"
                id="like"
                className="stack-button green btn button-outline shadow"
                onClick={this.handleClick}
              >
                <i className="fas fa-heart fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
