using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class VendorIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public VendorIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateVendorId()
        {
            const string prefix = "VEN";
            const int numericPartLength = 5;

            int currentId = GetMaxVendorIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated ItemId already exists in the database
            while (IsDuplicateVendorId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxVendorIdNumericPart()
        {
            string maxNumericPart = _dbContext.Vendors
                .Select(s => s.VendorId.Substring(3)) // Extract the numeric part by removing the prefix
                .OrderByDescending(s => s)
                .FirstOrDefault();

            if (int.TryParse(maxNumericPart, out int maxNumericPartValue))
            {
                return maxNumericPartValue;
            }
            else
            {
                return 0; // If no existing Notification IDs are found, start from 0
            }
        }

        private bool IsDuplicateVendorId(string VendorId)
        {
            return _dbContext.Vendors.Any(s => s.VendorId == VendorId);
        }
    }
}
