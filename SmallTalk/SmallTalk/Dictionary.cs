using System;
using System.Collections.Generic;

namespace SmallTalk;

public partial class Dictionary
{
    public int DictionaryId { get; set; }

    public string? DictionaryName { get; set; }

    public string? Language { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }

    public virtual ICollection<UserDictionary> UserDictionaries { get; set; } = new List<UserDictionary>();
}
