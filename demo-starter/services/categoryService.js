"use strict";
exports.__esModule = true;
exports.CategoryService = void 0;
var CategoryService = /** @class */ (function () {
    function CategoryService() {
        this.categories = [];
    }
    CategoryService.prototype.getAll = function () {
        return this.categories;
    };
    CategoryService.prototype.getById = function (categoryId) {
        return this.categories.find(function (category) { return category.categoryId === categoryId; });
    };
    CategoryService.prototype.addCategory = function (category) {
        this.categories.push(category);
    };
    CategoryService.prototype.deleteCategory = function (categoryId) {
        this.categories = this.categories.filter(function (category) { return category.categoryId !== categoryId; });
        return categoryId + " category deleted";
    };
    CategoryService.prototype.updateCategory = function (updateCategory) {
        var foundCategoryIndex = this.categories.findIndex(function (category) { return category.categoryId === updateCategory.categoryId; });
        this.categories[foundCategoryIndex] = updateCategory;
    };
    return CategoryService;
}());
exports.CategoryService = CategoryService;
