namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class PagedSearch
    {
        public int Page { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}