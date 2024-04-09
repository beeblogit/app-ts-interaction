interface MetaPagination {
    page: number;
    perPage: number;
    totalCount: number;
    pageCount: number;
    Offset(): number;
    Limit(): number;
}

interface PaginationRequest {
    page: number | string;
    limit: number | string;
    totalCount?: number | string;
}

// DefaultPageSize specifies the default page size
const DefaultPageSize = 25;

// MaxPageSize specifies the maximum page size
const MaxPageSize = 100;

const buildPaginator = (params: PaginationRequest): MetaPagination => {
    let page = parseInt(<string>params.page, 10) || 1;
    let perPage = parseInt(<string>params.limit, 10) || DefaultPageSize;
    let totalCount = parseInt(<string>params.totalCount, 10);
    if (totalCount < 0) {
        totalCount = MaxPageSize
    }
    

    if (perPage <= 0) {
        perPage = DefaultPageSize;
    }
    if (perPage > MaxPageSize) {
        perPage = MaxPageSize;
    }
    let pageCount = 0;
    if (totalCount > 0) {
        pageCount = Math.ceil(totalCount / perPage);
    }
    if (page > pageCount) {
        page = pageCount;
    }
    if (page < 1) {
        page = 1;
    }

    return {
        totalCount,
        page,
        pageCount,
        perPage,
        Offset: function () {
            return (this.page - 1) * this.perPage;
        },
        Limit: function () {
            return this.perPage;
        },
    };
};

export { PaginationRequest, MetaPagination, buildPaginator};
