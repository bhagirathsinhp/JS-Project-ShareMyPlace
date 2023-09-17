import { Modal } from "./UI/modal";
import { Map } from "./UI/map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const shareLinkInputEl = document.getElementById("share-link");
    if (!navigator.clipboard) {
      shareLinkInputEl.select();
      return;
    }

    navigator.clipboard
      .writeText(shareLinkInputEl.value)
      .then(() => {
        alert("Copied to Clipboard!");
      })
      .catch((err) => {
        console.log(err);
        shareLinkInputEl.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInputEl = document.getElementById("share-link");
    shareLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature isn't available in your browser, please use a more modern browser or manually enter an address."
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading Location - Please Wait!"
    );

    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        // console.log(successResult);
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        // console.log(coordinates);
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (errorResult) => {
        modal.hide();
        alert("Couldn't locate you! Please enter an address manually.");
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid Address. Please Enter Again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading Location - Please Wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
