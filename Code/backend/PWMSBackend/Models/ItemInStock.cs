namespace PWMSBackend.Models
{
    public class ItemInStock : Item
    {
        /*[DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Date")]*/
        public DateTime Date { get; set; }

        public double UnitPrice { get; set; }

        public int QuantityAvailable { get; set; }
    }
}