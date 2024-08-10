function RecipeDetail({ image, name, calories }) {
  return (
    <div>
      RecipeDetail
      <div>
        <img
          src={image}
          alt={name}
          className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
        />
        <p className="h-10 text-[0.8rem] font-semibold">{name}</p>
        <p>{calories} Calories</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
