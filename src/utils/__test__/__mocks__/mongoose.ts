// __mocks__/mongoose.ts

class QueryMock<T> {
  find(conditions?: any): this {
    // Mock the find method
    return this;
  }

  sort(sort: string): this {
    // Mock the sort method
    return this;
  }

  select(fields: string): this {
    // Mock the select method
    return this;
  }

  skip(skip: number): this {
    // Mock the skip method
    return this;
  }

  limit(limit: number): this {
    // Mock the limit method
    return this;
  }
}

class DocumentMock {
  // Add any necessary mock methods/properties
}

export {
  QueryMock,
  DocumentMock,
};
