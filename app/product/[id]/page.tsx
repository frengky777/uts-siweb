"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getProductById, Product, getFeaturedProducts } from "@/lib/data";
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (params?.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (featured products + same category)
        const featured = getFeaturedProducts().filter(p => p.id !== foundProduct.id);
        setRelatedProducts(featured.slice(0, 4));
      }
    }
    setIsLoading(false);
  }, [params]);
  
  if (!isLoading && !product) {
    notFound();
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-black relative">
      {/* Spooky background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-red-950/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/shop" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden border border-gray-800 bg-black h-[400px] md:h-[500px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${product.image})`,
                filter: "brightness(0.9) contrast(1.1)"
              }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            
            {/* Price tag */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="text-lg py-1 px-3 bg-red-900 hover:bg-red-800">
                ${product.price.toFixed(2)}
              </Badge>
              {product.oldPrice && (
                <div className="text-gray-400 text-right mt-1 line-through">
                  ${product.oldPrice.toFixed(2)}
                </div>
              )}
            </div>
            
            {/* Stock badge */}
            <div className="absolute bottom-4 left-4 z-10">
              <Badge variant={product.inStock ? "outline" : "destructive"} className="py-1 px-3">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-400 ml-2">({product.rating})</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 mb-8 text-lg">
              {product.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags?.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-gray-900 text-gray-300 hover:bg-gray-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Separator className="my-8 bg-gray-800" />
            
            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <h3 className="text-white font-medium mb-4">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-800 text-gray-400 hover:text-white"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center text-white text-lg font-medium">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-800 text-gray-400 hover:text-white"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                
                <Button
                  className="ml-6 bg-red-800 hover:bg-red-700 text-white flex-1"
                  size="lg"
                  onClick={addToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Shipping and Guarantees */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-300">
                <Truck className="h-5 w-5 text-red-500 mr-3" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center text-gray-300">
                <ShieldCheck className="h-5 w-5 text-red-500 mr-3" />
                <span>30-day return policy with our Cursed Guarantee</span>
              </div>
            </div>
            
            {/* Additional Info Tabs */}
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="details" className="data-[state=active]:bg-red-900">
                  Details
                </TabsTrigger>
                <TabsTrigger value="shipping" className="data-[state=active]:bg-red-900">
                  Shipping
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-red-900">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 text-gray-300">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
                  <h4 className="text-white font-medium mb-2">Product Specifications</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Made from premium materials forged in the darkest pits</li>
                    <li>Fits most modern motorcycle models (2010 and newer)</li>
                    <li>Includes all necessary mounting hardware</li>
                    <li>1-year warranty against manufacturing defects</li>
                    <li>Handcrafted by our master technicians under a full moon</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4 text-gray-300">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
                  <h4 className="text-white font-medium mb-2">Shipping Information</h4>
                  <p className="text-gray-400 mb-4">
                    All orders are processed and shipped within 1-2 business days. Our spectral delivery fleet ensures your parts arrive quickly and in perfect condition.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Standard Shipping: 3-5 business days (Free on orders over $99)</li>
                    <li>Express Shipping: 1-2 business days ($15.99)</li>
                    <li>Overnight Delivery: Next business day ($29.99)</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4 text-gray-300">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
                  <h4 className="text-white font-medium mb-4">Customer Reviews</h4>
                  <div className="space-y-4">
                    <div className="border-b border-gray-800 pb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">Ghostly Rider</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400">
                        This part exceeded my expectations! Installation was a breeze and the quality is outstanding. My bike now sounds like it's possessed by demons, exactly what I wanted!
                      </p>
                    </div>
                    <div className="border-b border-gray-800 pb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">Night Crawler</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400">
                        Great quality but took a bit longer to install than expected. The effect is worth it though - my bike has never looked more intimidating.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-creepster text-3xl text-red-600 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}