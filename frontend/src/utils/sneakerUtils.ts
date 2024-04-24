import api from "../api/apiService";
import { ISneaker } from "../interfaces/ISneaker";

export function getNewArrivals(
  sneakers: ISneaker[],
  count: number
): ISneaker[] {
  const latestSneakers = sneakers.slice(-count).reverse();
  return latestSneakers;
}

export function getRandomSneakers(
  sneakers: ISneaker[],
  count: number
): ISneaker[] {
  const shuffledSneakers = sneakers.sort(() => 0.5 - Math.random());
  return shuffledSneakers.slice(0, count);
}

export function extractUniqueSizes(sneakers: ISneaker[]): number[] {
  const sizesSet = new Set<number>();

  sneakers.forEach((sneaker) => {
    sneaker.sizes.forEach((size) => {
      const sizeNumber = parseFloat(size.number);
      if (!isNaN(sizeNumber)) {
        sizesSet.add(sizeNumber);
      }
    });
  });

  return Array.from(sizesSet).sort((a, b) => a - b);
}

export const getBrands = async () => {
  try {
    const response = await api.get("/brands");
    if (response.status === 200) {
      return response.data.items;
    }
  } catch (error) {
    console.error(error);
  }
};
