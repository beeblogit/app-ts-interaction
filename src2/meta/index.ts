interface MetaPagination {
    page: number;
    perPage: number;
    totalCount: number;
    pageCount: number;
    Offset(): number;
    Limit(): number;
}

// DefaultPageSize specifies the default page size
const DefaultPageSize = 25;

// MaxPageSize specifies the maximum page size
const MaxPageSize = 100;

const buildPaginator = (page: number | string, limit: number | string, total: number | string): MetaPagination => {
    let pageValue = parseInt(<string>page, 10) || 1;
    let perPage = parseInt(<string>limit, 10) || DefaultPageSize;
    let totalCount = parseInt(<string>total, 10);
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
    if (pageValue > pageCount) {
        pageValue = pageCount;
    }
    if (pageValue < 1) {
        pageValue = 1;
    }

    return {
        totalCount,
        page: pageValue,
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

export {MetaPagination, buildPaginator};
