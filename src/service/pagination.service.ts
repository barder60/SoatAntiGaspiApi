export const preparePaginationOptions = (params:any) => {
    if (params.isNoLimitPagination) return {}
    const limit = params.limit ? +(params.limit) : 10;
    const offset = params.page && params.page > 0 ? +(((params.page - 1) * limit)) : 0;
    return { limit, offset };
}
