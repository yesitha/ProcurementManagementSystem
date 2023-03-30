namespace PWMSBackend.Models
{
    public class Vendor
    {
        public string VendorId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string EmailAddress { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string State { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Salutation { get; set; }

        public string CompanyFullName { get; set; }

        public byte[] BusinessRegistrationDoc { get; set; }

        public byte[] TaxIdentificationDoc { get; set; }

        public byte[] InsuaranceCertificate { get; set; }

        public byte[] OtherDocs { get; set; }
        public ICollection<VendorPlaceBidItem> VendorPlaceBidItems { get; set; }
        public ICollection<VendorhasItem> VendorhasItems { get; set; }
        public ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}