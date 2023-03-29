namespace PWMSBackend.Models
{
    public class Category
    {
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }

        //One to many Relationships
        public ICollection<ApprovedItem> ApprovedItems { get; set; }
    }
}