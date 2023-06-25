using PWMSBackend.Data;

namespace PWMSBackend.CustomIdGenerator
{
    public class CommitteeIdGenerator
    {
        private DataContext _dbContext;
        private Random _random;

        public CommitteeIdGenerator(DataContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public string GenerateCommitteeId()
        {
            const string prefix = "COM";
            const int numericPartLength = 5;

            int currentId = GetMaxCommitteeIdNumericPart() + 1; // Get the maximum numeric part from the existing Notification IDs in the database

            string numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the current ID with leading zeros
            string customId = prefix + numericPart;

            // Check if the generated CommitteeId already exists in the database
            while (IsDuplicateCommitteeId(customId))
            {
                currentId++; // Increment the current ID if duplicate found
                numericPart = currentId.ToString($"D{numericPartLength}"); // Pad the updated ID with leading zeros
                customId = prefix + numericPart;
            }

            return customId;
        }

        private int GetMaxCommitteeIdNumericPart()
        {
            string maxNumericPart = _dbContext.Committees
                .Select(s => s.CommitteeId.Substring(3)) // Extract the numeric part by removing the prefix
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

        private bool IsDuplicateCommitteeId(string CommiteeId)
        {
            return _dbContext.Committees.Any(s => s.CommitteeId == CommiteeId);
        }

        //public string GenerateCommitteeId()
        //{
        //    const string prefix = "COM";

        //    string numericPart = GenerateRandomNumericPart();
        //    string customId = prefix + numericPart;

        //    // Check if the generated ItemId already exists in the database
        //    while (IsDuplicateCommitteeId(customId))
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

        //private bool IsDuplicateCommitteeId(string committeeId)
        //{
        //    return _dbContext.Committees.Any(s => s.CommitteeId == committeeId);
        //}
    }
}
