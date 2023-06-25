using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class GRNIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public GRNIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateGRNId()
        {
            const string prefix = "GRN";
            const int numericPartLength = 5;

            int currentId = GetMaxGRNIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated GRNId already exists in the database
            while (IsDuplicateGRNId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxGRNIdNumericPart()
        {
            string maxNumericPart = _dbContext.GRNs
                .Select(s => s.GrnId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicateGRNId(string GRNId)
        {
            return _dbContext.GRNs.Any(s => s.GrnId == GRNId);
        }

        //public string GenerateGRNId()
        //{
        //    const string prefix = "GRN";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated GRNId already exists in the database
        //    while (IsDuplicateGRNId(customId))
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

        //private bool IsDuplicateGRNId(string GRNId)
        //{
        //    return _dbContext.GRNs.Any(s => s.GrnId == GRNId);
        //}
    }
}
