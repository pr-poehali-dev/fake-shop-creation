import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Швейцарские часы Elegance',
    price: 245000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/ceb88278-e7cc-47f5-aeb7-06f710e152b7.jpg',
    description: 'Роскошные швейцарские часы с сапфировым стеклом'
  },
  {
    id: 2,
    name: 'Кожаная сумка Premium',
    price: 89000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/0feb22f4-102a-487c-8953-66eebeb8e42f.jpg',
    description: 'Итальянская кожа ручной работы'
  },
  {
    id: 3,
    name: 'Парфюм Noir de Luxe',
    price: 15000,
    category: 'Парфюмерия',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/d74930a2-0807-44b8-a12f-b9bcd9cdb6a6.jpg',
    description: 'Эксклюзивный аромат от французского парфюмера'
  },
  {
    id: 4,
    name: 'Солнцезащитные очки Ray',
    price: 32000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/d14afb62-e9a7-4a8a-9551-fc6d291eac64.jpg',
    description: 'Премиальная защита от UV-лучей'
  },
  {
    id: 5,
    name: 'Кашемировый шарф',
    price: 28000,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/4faaa818-b42e-4b07-95e3-3582eb748f3c.jpg',
    description: '100% кашемир из Шотландии'
  },
  {
    id: 6,
    name: 'Кожаный портфель Executive',
    price: 125000,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/a510a167-777b-4992-b03e-e8f90f4fbff5.jpg',
    description: 'Ручная работа, натуральная кожа'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success('Добавлено в корзину!');
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    setShowCheckout(false);
    setShowCart(false);
    setCart([]);
    setFormData({ name: '', email: '', phone: '', address: '' });
    
    toast.success('Спасибо за покупку!', {
      description: 'Ваш заказ успешно оформлен',
      duration: 5000,
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">LUXE BOUTIQUE</h1>
          <Button
            variant="secondary"
            size="lg"
            className="relative"
            onClick={() => setShowCart(true)}
          >
            <Icon name="ShoppingBag" className="mr-2" />
            Корзина
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Премиальная коллекция
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Эксклюзивные товары высочайшего качества для взыскательных покупателей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Icon name="Plus" className="mr-2" size={18} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end animate-fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCart(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Icon name="X" />
              </Button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingBag" className="mx-auto mb-4 text-muted-foreground" size={64} />
                  <p className="text-muted-foreground text-lg">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" className="ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-lg animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Оформление заказа</CardTitle>
              <CardDescription>
                Заполните данные для доставки
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCheckout}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Полное имя</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="г. Москва, ул. Пушкина, д. 1"
                  />
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold mb-4">
                    <span>Сумма к оплате:</span>
                    <span className="text-primary text-2xl">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Оплатить
                  <Icon name="CreditCard" className="ml-2" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;