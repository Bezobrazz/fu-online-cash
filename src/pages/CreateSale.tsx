import { useState } from "react";
import { CategoriesBar } from "../components/CategoriesBar/CategoriesBar";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { AiOutlineDoubleRight } from "react-icons/ai";

interface Product {
    productName: string;
    productQuantity: number;
    productPrice: number;
}

interface CartItem extends Product {
    quantity: number;
}

const CreateSale: React.FC = () => {

    const [productsInCart, setProductsInCart] = useState<CartItem[]>([]);

    const handleProductToCart = (product: Product) => {
        setProductsInCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.productName === product.productName);
            if (existingProductIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    const products: Product[] = [
        {
            productName: "Кора Крупна",
            productQuantity: 345,
            productPrice: 150
        },
        {
            productName: "Кора Середня",
            productQuantity: 214,
            productPrice: 150
        },
        {
            productName: "Кора Дрібна",
            productQuantity: 124,
            productPrice: 130
        },
    ];

    const getProductInitials = (name: string): string => {
        const words = name.split(' ');
        const initials = words.map(word => word.charAt(0)).join('');
        return initials;
    }

    const combinedProducts = productsInCart.reduce((acc: CartItem[], item) => {
        const existingItemIndex = acc.findIndex(product => product.productName === item.productName);
        if (existingItemIndex > -1) {
            acc[existingItemIndex].quantity += item.quantity;
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

    const totalItemsInCart = combinedProducts.length;
    const totalCartValue = productsInCart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);

    return (
        <div className="flex gap-2">
            <CategoriesBar />
            
            <div className="flex flex-col gap-4 relative">
                <div className="flex gap-4 flex-wrap overflow-y-auto">
                    {products.map((item, index) => (
                        <div key={index} onClick={() => handleProductToCart(item)}>
                            <ProductCard
                                productName={item.productName}
                                productQuantity={item.productQuantity}
                                productPrice={item.productPrice}
                                productInitials={getProductInitials(item.productName)}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-full h-20 bg-teal-500 p-2 rounded flex items-center justify-between absolute bottom-0 left-0">
                    <p className="text-white text-lg">Товарів у кошику: {totalItemsInCart} / {totalCartValue} грн</p>
                    <AiOutlineDoubleRight className="text-white"/>
                </div>
            </div>
        </div>
    );
};

export default CreateSale;
