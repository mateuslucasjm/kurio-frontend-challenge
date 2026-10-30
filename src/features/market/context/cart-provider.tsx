import type { NFT, NFTEdition } from "@/data/nfts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  nft: NFT;
  quantity: number;
  edition: NFTEdition;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (nft: NFT, quantity: number, edition: NFTEdition) => void;
  removeFromCart: (nftId: string, edition: NFTEdition) => void;
  updateQuantity: (
    nftId: string,
    edition: NFTEdition,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
  userId: string | null;
}

const getCartStorageKey = (userId: string | null) =>
  userId ? `kurio-cart-${userId}` : "kurio-cart-guest";

const CartContext = createContext<CartContextValue | null>(null);

function getStoredCart(userId: string | null): CartItem[] {
  try {
    const storedCart = localStorage.getItem(getCartStorageKey(userId));

    if (!storedCart) return [];

    const parsedCart: unknown = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children, userId }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => getStoredCart(userId));

  useEffect(() => {
    localStorage.setItem(getCartStorageKey(userId), JSON.stringify(items));
  }, [items, userId]);

  const addToCart = useCallback(
    (nft: NFT, quantity: number, edition: NFTEdition) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.nft.id === nft.id && item.edition === edition,
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.nft.id === nft.id && item.edition === edition
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          );
        }

        return [...currentItems, { nft, quantity, edition }];
      });
    },
    [],
  );

  const removeFromCart = useCallback((nftId: string, edition: NFTEdition) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.nft.id !== nftId || item.edition !== edition,
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (nftId: string, edition: NFTEdition, quantity: number) => {
      if (quantity < 1) return;

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.nft.id === nftId && item.edition === edition
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.nft.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser utilizado dentro de CartProvider.");
  }

  return context;
}
