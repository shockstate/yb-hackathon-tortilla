using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Validations
{
    public class StartDateTimeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var startDateTime = (DateTime)value;

            if (startDateTime < DateTime.Now)
            {
                return new ValidationResult("Should be greater than today", new List<string>()
                {
                    validationContext.MemberName
                });
            }

            return ValidationResult.Success;
        }
    }
}
