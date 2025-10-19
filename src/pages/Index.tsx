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
    name: 'Футболка KOMARSER',
    price: 1500,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/b968a950-e15c-41ee-89ea-fb36ffa46d95.jpg',
    description: 'Чёрная футболка с логотипом исполнителя'
  },
  {
    id: 2,
    name: 'Худи KOMARSER',
    price: 3500,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/eb19d235-b97b-44a7-acb4-afad273c3103.jpg',
    description: 'Тёплое худи с принтом KOMARSER'
  },
  {
    id: 3,
    name: 'Кепка KOMARSER',
    price: 1200,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/a3f83d81-48ac-4f07-96fe-402f8678fd94.jpg',
    description: 'Бейсболка с вышитым логотипом'
  },
  {
    id: 4,
    name: 'Шоппер KOMARSER',
    price: 800,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/c4aa8e78-3329-4504-b4df-f9725678996f.jpg',
    description: 'Тканевая сумка с принтом'
  },
  {
    id: 5,
    name: 'Набор стикеров KOMARSER',
    price: 300,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/24a4d037-9be4-4763-9a7b-79091529d0d2.jpg',
    description: 'Коллекция виниловых наклеек'
  },
  {
    id: 6,
    name: 'Чехол на телефон KOMARSER',
    price: 900,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/59973f6d-fdea-4d20-a536-f3e2a678e926.jpg',
    description: 'Стильный чехол с логотипом исполнителя'
  },
  {
    id: 7,
    name: 'Журнал «Призрачный гонщик»',
    price: 1000,
    category: 'Комиксы',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/f87663b7-0310-4bbb-a9ef-341421e23c41.jpg',
    description: 'Культовый комикс о мотоциклисте с огненным черепом'
  },
  {
    id: 8,
    name: 'Комикс «Человек-паук»',
    price: 850,
    category: 'Комиксы',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/6bdf5cca-25a7-4988-a90e-700cf9631d79.jpg',
    description: 'Винтажный выпуск с приключениями супергероя'
  },
  {
    id: 9,
    name: 'Комикс «Бэтмен»',
    price: 950,
    category: 'Комиксы',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/6a1e03f0-022a-4ae1-b2f2-7690b5e49863.jpg',
    description: 'Тёмный рыцарь в классическом выпуске DC'
  },
  {
    id: 10,
    name: 'Комикс «Люди Икс»',
    price: 900,
    category: 'Комиксы',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/91de53de-ab49-4ee8-a892-35ec1c35aef6.jpg',
    description: 'Команда мутантов против зла'
  },
  {
    id: 11,
    name: 'Комикс «Дэдпул»',
    price: 880,
    category: 'Комиксы',
    image: 'https://cdn.poehali.dev/projects/cec57cb3-8eca-487e-acf7-cea9659cb461/files/37637c9f-cbc9-4622-8423-873fdb02c262.jpg',
    description: 'Безумный антигерой в красном костюме'
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">KOMARSER MERCH</h1>
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
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-6 mb-8 text-center">
          <p className="text-xl font-bold text-red-900 mb-2">
            ⚠️ ЭТО ПРОБНЫЙ САЙТ ⚠️
          </p>
          <p className="text-md text-red-800">
            Товары не настоящие. Оплата не работает. Создано для демонстрации возможностей.
          </p>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Официальный мерч KOMARSER
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Поддержи любимого исполнителя — носи стильный мерч!
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