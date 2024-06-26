export type TeamShadow = {
  "version": "0.1.0",
  "name": "team_shadow",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userInteractions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "totalDeposits",
            "type": "u64"
          },
          {
            "name": "totalWithdrawals",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: TeamShadow = {
  "version": "0.1.0",
  "name": "team_shadow",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "userVaultAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "by the signer, ensuring it has the correct ownership and permissions."
          ]
        },
        {
          "name": "userInteractionsCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userInteractions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "totalDeposits",
            "type": "u64"
          },
          {
            "name": "totalWithdrawals",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
