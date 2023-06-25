using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class ItemIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public ItemIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateItemId()
        {
            const string prefix = "ITM";
            const int numericPartLength = 5;

            int currentId = GetMaxItemIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated ItemId already exists in the database
            while (IsDuplicateItemId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxItemIdNumericPart()
        {
            string maxNumericPart = _dbContext.Items
                .Select(s => s.ItemId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicateItemId(string ItemId)
        {
            return _dbContext.Items.Any(s => s.ItemId == ItemId);
        }


        //public string GenerateItemId()
        //{
        //    const string prefix = "ITM";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated ItemId already exists in the database
        //    while (IsDuplicateItemId(customId))
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

        //private bool IsDuplicateItemId(string itemId)
        //{
        //    return _dbContext.Items.Any(s => s.ItemId == itemId);
        //}
    }
}
