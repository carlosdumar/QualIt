using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QualIt.TechnicalTest.Web.Models
{
    public class Author
    {
        public int AuthorId { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        [Required]
        [MaxLength(30)]
        public string Nationality { get; set; }
    }
}