import { Category } from "../models/categoryModel";
export class CategoryService {
  categories: Category[] = [];
  getAll(): Category[] {
    return this.categories;
  }

  getById(categoryId: number): Category | undefined {
    return this.categories.find(
      (category) => category.categoryId === categoryId
    );
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }

  deleteCategory(categoryId: number) {
    this.categories = this.categories.filter(
      (category) => category.categoryId !== categoryId
    );
    return `${categoryId} category deleted`;
  }

  updateCategory(updateCategory: Category) {
    let foundCategoryIndex = this.categories.findIndex(
      (category) => category.categoryId === updateCategory.categoryId
    );
    this.categories[foundCategoryIndex] = updateCategory;
  }
}
