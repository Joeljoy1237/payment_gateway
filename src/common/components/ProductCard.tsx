import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-green-500/50 transition-shadow">
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 bg-black">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-green-500 font-bold">&#8377;{price}</p>
        </div>
      </div>
    </Link>
  );
}
