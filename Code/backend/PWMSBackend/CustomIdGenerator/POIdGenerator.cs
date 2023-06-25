using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class POIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public POIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GeneratePOId()
        {
            const string prefix = "POI";
            const int numericPartLength = 5;

            int currentId = GetMaxPOIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated POId already exists in the database
            while (IsDuplicatePOId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxPOIdNumericPart()
        {
            string maxNumericPart = _dbContext.PurchaseOrders
                .Select(s => s.PoId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicatePOId(string POId)
        {
            return _dbContext.PurchaseOrders.Any(s => s.PoId == POId);
        }

        //public string GeneratePOId()
        //{
        //    const string prefix = "PO";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated POId already exists in the database
        //    while (IsDuplicatePOId(customId))
        //    {
        //        numericPart = GenerateRandomNumericPart();
        //        customId = prefix + numericPart;
        //    }

        //    return customId;
        //}

        //private string GenerateRandomNumericPart()
        //{
        //    int minValue = 0;
        //    int maxValue = 99999; // 5-digit number range
        //    int randomValue = _random.Next(minValue, maxValue + 1); // Add 1 to include maxValue in the range

        //    string numericPart = randomValue.ToString("D5"); // Pad the random value with leading zeros
        //    return numericPart;
        //}

        //private bool IsDuplicatePOId(string poId)
        //{
        //    return _dbContext.PurchaseOrders.Any(s => s.PoId == poId);
        //}
    }
}
