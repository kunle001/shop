import { Document, Query } from "mongoose";

interface APIFeaturesQuery {
  find(conditions?: any): Query<any[], Document>;
  sort(sort: string): Query<any[], Document>;
  select(fields: string): Query<any[], Document>;
  skip(skip: number): Query<any[], Document>;
  limit(limit: number): Query<any[], Document>;
}
// This is a utility that helps querying the database from the request query
// starting with sorting, filtering, paginating and limiting certain fields.
class APIFeatures {
  query: APIFeaturesQuery;
  queryString: any;

  constructor(query: APIFeaturesQuery, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'fields', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-years');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export { APIFeatures };
