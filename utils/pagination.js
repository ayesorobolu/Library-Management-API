class Pagination {
 static getParams(req){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
 }

 static paginate(data, page, offset, limit) {
    const startIndex = offset;
    const endIndex = offset + limit;
     const paginatedData = data.slice(startIndex, endIndex);
    return {
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
        data: paginatedData,
        page: page,
        limit: limit,
        isNext : endIndex < data.length,
        isPrev : startIndex > 0
    };
 }
}

export default Pagination;