import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Utils "Utils";

actor {

  public query func greet(seed : Nat64) : async [Nat8] {
    // let noiseMap = Utils.generateNoiseMap(10, 10, 4.0, seed);
    // let imageData = Utils.generateImageData(noiseMap, 25, 25);
    // return imageData;

    let width : Nat = 854;
    let height : Nat = 480;
    let scale : Float = 25.0;

    let noiseMap = Utils.generateNoiseMap(width, height, scale, seed);
    let imageData = Utils.generateImageData(noiseMap, width, height);

    // Print the image data for visual inspection
    // Utils.printImageData(imageData, width, height);
    return imageData;
  };
};
