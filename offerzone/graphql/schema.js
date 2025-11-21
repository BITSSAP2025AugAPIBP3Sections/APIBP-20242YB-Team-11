module.exports.typeDefs = /* GraphQL */ `
  # USER
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    city: String
  }

  # PRODUCT
  type Product {
    id: ID!
    name: String!
    brand: String!
    category: String!
    description: String
    price: Float!
    city: String!
    area: String!
    image: String
    retailer: User!
  }

  # PAGINATION WRAPPER
  type ProductPaginated {
    products: [Product]!
    total: Int!
    page: Int!
    totalPages: Int!
  }

  # QUERIES
  type Query {
    test: String!
    products(
      city: String
      area: String
      category: String
      brand: String
      search: String
      minPrice: Float
      maxPrice: Float
      page: Int
      limit: Int
      sort: String
    ): ProductPaginated!

    product(id: ID!): Product
    myProducts: [Product]!
  }
`;

module.exports.resolvers = {
  Query: {
    test: () => "GraphQL is working!",
    products: async (_, args, ctx) => {
      const Product = require("../models/Product");

      const {
        city,
        area,
        category,
        brand,
        search,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        sort = "-createdAt",
      } = args;

      const filters = {};

      if (city) filters.city = city;
      if (area) filters.area = area;
      if (category) filters.category = category;
      if (brand) filters.brand = brand;

      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }

      if (search) {
        filters.$or = [
          { name: new RegExp(search, "i") },
          { brand: new RegExp(search, "i") },
          { category: new RegExp(search, "i") },
        ];
      }

      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        Product.find(filters)
          .populate("retailer", "name email role city")
          .sort(sort.split(",").join(" "))
          .skip(skip)
          .limit(Number(limit)),
        Product.countDocuments(filters),
      ]);

      return {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    },

    product: async (_, { id }) => {
      const Product = require("../models/Product");
      return Product.findById(id).populate("retailer", "name email role city");
    },

    myProducts: async (_, __, ctx) => {
      const Product = require("../models/Product");

      if (!ctx.user) throw new Error("Unauthorized");
      if (ctx.user.role !== "retailer")
        throw new Error("Only retailers can fetch their products");

      return Product.find({ retailer: ctx.user.id });
    },
  },
};
