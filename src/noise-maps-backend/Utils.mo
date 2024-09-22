import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Random "mo:noise/Random";
import Noise "mo:noise/Noise";

module {
  public func generateNoiseMap(
    width : Nat,
    height : Nat,
    scale : Float,
    seed : Nat64,
  ) : [var Float] {
    let xoroshiro = Random.xSetSeed(seed);
    let perlinNoise = Noise.xPerlinInit(xoroshiro);

    var noiseMap = Array.init<Float>(width * height, 0.0);

    for (x in Iter.range(0, width - 1)) {
      for (y in Iter.range(0, height - 1)) {
        let nx = Float.fromInt(x) / scale;
        let ny = Float.fromInt(y) / scale;
        let noiseValue = Noise.samplePerlinNoise(perlinNoise, nx, ny, 0.0, 0.0, 0.0);
        let index = y * width + x;
        noiseMap[index] := noiseValue;
      };
    };

    return noiseMap;
  };

  public func generateImageData(noiseMap : [var Float], width : Nat, height : Nat) : [Nat8] {
    var imageData = Array.init<Nat8>(width * height, 0);

    for (x in Iter.range(0, width - 1)) {
      for (y in Iter.range(0, height - 1)) {
        let index = y * width + x;
        let normalizedValue = (noiseMap[index] + 1.0) / 2.0 * 255.0; // Map from [-1, 1] to [0, 255]
        imageData[index] := Nat8.fromNat(Int.abs(Float.toInt(Float.nearest(normalizedValue))));
      };
    };

    return Array.freeze(imageData);
  };

  public func printImageData(imageData : [Nat8], width : Nat, height : Nat) {
    for (y in Iter.range(0, height - 1)) {
      for (x in Iter.range(0, width - 1)) {
        let index = y * width + x;
        let value = imageData[index];
        Debug.print(debug_show (value) # " ");
      };
      Debug.print("\n");
    };
  };
};
