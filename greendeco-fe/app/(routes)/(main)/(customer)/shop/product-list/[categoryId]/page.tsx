export default function ProductListWithCategoryPage({
	params,
}: {
	params: { categoryId: string }
}) {
	return <h1>Product {params.categoryId} List </h1>
}
