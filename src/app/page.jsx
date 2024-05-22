import { revalidateTag } from "next/cache";

const Home = async () => {
  const res = await fetch(
    "https://64cc82a52eafdcdc8519e770.mockapi.io/new_products",
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["new_products"],
      },
    }
  );

  const products = await res.json();

  // Server action function to add products to the database
  const addProduct = async (e) => {
    "use server";

    const product = e.get("product").toString();
    const price = e.get("price").toString();

    if (!product || !price) {
      return;
    }

    const newProduct = {
      product,
      price,
    };

    await fetch("https://64cc82a52eafdcdc8519e770.mockapi.io/new_products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("new_products");
  };

  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center">Products</h1>

      <form
        action={addProduct}
        className="flex flex-col gap-5 max-w-xl mx-auto p-5"
      >
        <input
          name="product"
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 p-2 rounded-md"
        />

        <input
          name="price"
          type="text"
          placeholder="Price..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>

      <h2 className="text-2xl font-bold text-center">List of Products</h2>

      <div className="p-10 flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>$ {product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
