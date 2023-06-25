using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class MppIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public MppIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateMppId()
        {
            const string prefix = "MPP";
            const int numericPartLength = 5;

            int currentId = GetMaxMppIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated MppId already exists in the database
            while (IsDuplicateMppId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxMppIdNumericPart()
        {
            string maxNumericPart = _dbContext.MasterProcurementPlans
                .Select(s => s.MppId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicateMppId(string MppId)
        {
            return _dbContext.MasterProcurementPlans.Any(s => s.MppId == MppId);
        }

        //public string GenerateMppId()
        //{
        //    const string prefix = "MPP";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated MppId already exists in the database
        //    while (IsDuplicateMppId(customId))
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

        //private bool IsDuplicateMppId(string mppId)
        //{
        //    return _dbContext.MasterProcurementPlans.Any(s => s.MppId == mppId);
        //}
    }
}
