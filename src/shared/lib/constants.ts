export const POSTHOG_EVENTS = {
  RESUME_CREATED: 'resume_created',
  RESUME_IMPORTED: 'resume_imported',
  RESUME_DUPLICATED: 'resume_duplicated',
  RESUME_DELETED: 'resume_deleted',
  RESUME_DOWNLOADED: 'resume_downloaded',
  RESUME_SHARED: 'resume_shared',
  RESUME_IMPORT_FAILED: 'resume_import_failed',
  RESUME_CREATED_ANONYMOUSLY: 'resume_created_anonymously',
  RESUME_IMPORTED_ANONYMOUSLY: 'resume_imported_anonymously',

  ENHANCE_WITH_AI_USED: 'enhance_with_ai_used',
  THEME_SWITCHED: 'theme_switched',
  TEMPLATE_SWITCHED: 'template_switched',
};


export const GROQ_AI_MODEL = process.env.GROQ_AI_MODEL || `meta-llama/llama-4-scout-17b-16e-instruct`

export const RESUME_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: ['string', 'null'] },
    image: { type: ['string', 'null'] },
    userId: { type: ['string', 'null'] },
    title: { type: ['string', 'null'], description: 'Title of the document' },
    category: { type: ['string', 'null'], enum: ['resume', null] },
    createdAt: { type: ['string', 'null'] },
    updatedAt: { type: ['string', 'null'] },
    status: { type: ['string', 'null'], enum: ['draft', 'published', 'archived', null] },
    templateId: { type: ['string', 'null'] },
    config: {
      type: ['object', 'null'],
      properties: {
        theme: {
          type: ['object', 'null'],
          properties: {
            fontFamily: { type: ['string', 'null'] },
            headingColor: { type: ['string', 'null'] },
            textColor: { type: ['string', 'null'] },
            backgroundColor: { type: ['string', 'null'] },
            linkColor: { type: ['string', 'null'] },
            headingFontSize: { type: ['string', 'null'] },
            textFontSize: { type: ['string', 'null'] },
          }
        },
        sectionDetails: {
          type: ['object', 'null'],
          properties: {
            personalInfo: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            summary: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            experience: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            education: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            skills: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            projects: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            certifications: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            achievements: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            },
            languages: {
              type: ['object', 'null'],
              properties: { id: { type: ['string', 'null'] }, name: { type: ['string', 'null'] }, visible: { type: ['boolean', 'null'] } }
            }
          }
        },
        mainColumnSectionOrder: {
          type: ['array', 'null'],
          items: { type: ['string', 'null'] }
        },
        sideColumnSectionOrder: {
          type: ['array', 'null'],
          items: { type: ['string', 'null'] }
        }
      }
    },
    sections: {
      type: ['object', 'null'],
      properties: {
        personalInfo: {
          type: ['object', 'null'],
          properties: {
            fullName: { type: ['string', 'null'] },
            headline: { type: ['string', 'null'] },
            email: { type: ['string', 'null'] },
            phone: { type: ['string', 'null'] },
            location: { type: ['string', 'null'] },
            website: {
              type: ['object', 'null'],
              properties: {
                label: { type: ['string', 'null'] },
                url: { type: ['string', 'null'] }
              }
            },
            links: {
              type: ['array', 'null'],
              items: {
                type: 'object',
                properties: {
                  id: { type: ['string', 'null'] },
                  label: { type: ['string', 'null'] },
                  url: { type: ['string', 'null'] },
                  iconName: { type: ['string', 'null'] }
                }
              }
            }
          }
        },
        summary: {
          type: ['object', 'null'],
          properties: {
            content: { type: ['string', 'null'] }
          }
        },
        experience: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              company: { type: ['string', 'null'] },
              title: { type: ['string', 'null'] },
              location: { type: ['string', 'null'] },
              timePeriod: { type: ['string', 'null'] },
              description: { type: ['string', 'null'] }
            }
          }
        },
        education: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              institution: { type: ['string', 'null'] },
              fieldOfStudy: { type: ['string', 'null'] },
              location: { type: ['string', 'null'] },
              timePeriod: { type: ['string', 'null'] },
              gpa: { type: ['string', 'null'] },
              description: { type: ['string', 'null'] }
            }
          }
        },
        skills: {
          type: ['object', 'null'],
          properties: {
            categories: {
              type: ['array', 'null'],
              items: {
                type: 'object',
                properties: {
                  id: { type: ['string', 'null'] },
                  name: { type: ['string', 'null'] },
                  skills: {
                    type: ['array', 'null'],
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: ['string', 'null'] },
                        name: { type: ['string', 'null'] },
                        level: { type: ['string', 'null'], enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', '', null] }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        projects: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              name: { type: ['string', 'null'] },
              description: { type: ['string', 'null'] },
              url: { type: ['string', 'null'] },
              technologies: {
                type: ['array', 'null'],
                items: { type: ['string', 'null'] }
              },
              timePeriod: { type: ['string', 'null'] }
            }
          }
        },
        certifications: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              name: { type: ['string', 'null'] },
              issuer: { type: ['string', 'null'] },
              date: { type: ['string', 'null'] },
              expirationDate: { type: ['string', 'null'] },
              credentialUrl: { type: ['string', 'null'] },
              description: { type: ['string', 'null'] }
            }
          }
        },
        achievements: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              title: { type: ['string', 'null'] },
              description: { type: ['string', 'null'] }
            }
          }
        },
        languages: {
          type: ['array', 'null'],
          items: {
            type: 'object',
            properties: {
              id: { type: ['string', 'null'] },
              language: { type: ['string', 'null'] },
              proficiency: { type: ['string', 'null'], enum: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic', '', null] }
            }
          }
        }
      }
    }
  },
  required: [
    'config',
    'sections'
  ]
};