# -*- coding: utf-8 -*-
"""Ways to support the foundation, plus the copy shared by /donate/ and /get-involved/."""
from __future__ import annotations

from sok.content.models import Card

GET_INVOLVED: tuple[Card, ...] = (
    Card(
        title='Volunteer',
        body='Serve in the kitchen, join a distribution round, help at a temple programme, '
             'or lend a professional skill. There is a place for every capacity and '
             'schedule.',
    ),
    Card(
        title='Donate',
        body='Contributions fund meals, scripture distribution, temple sevā, and counseling'
             ' programmes. Every rupee is directed to the objectives set out in our trust '
             'deed.',
    ),
    Card(
        title='Partner With Us',
        body='Schools, colleges, temples, community organisations, and agencies are invited'
             ' to collaborate on workshops, prevention initiatives, and support programmes.',
    ),
    Card(
        title='Sponsor a Programme',
        body='Sponsor a day of meal distribution, a bhaṇḍārā, a scripture-distribution '
             'drive, or a workshop series in your area or in memory of a loved one.',
    ),
)

#: Where donations are directed. Shown on /donate/.
DONATION_USES: tuple[Card, ...] = (
    Card(
        title='Meals for the Needy',
        body='Funds ingredients, kitchen costs, and distribution for free vegetarian meals '
             'in the communities we serve.',
    ),
    Card(
        title='Scripture Distribution',
        body='Prints and distributes the Bhagavad Gītā, Śrīmad Bhāgavatam, and related '
             'texts, and keeps our digital library free.',
    ),
    Card(
        title='Temple Sevā',
        body='Supports construction and restoration, bhaṇḍārā, festivals, and the daily '
             'needs of temples we assist.',
    ),
    Card(
        title='Counseling &amp; Prevention',
        body='Sustains counseling programmes, drug-abuse prevention initiatives, and '
             'workshops run with partner institutions.',
    ),
)

#: How the foundation works. Shown on /about-us/.
PRINCIPLES: tuple[Card, ...] = (
    Card(
        title='Open to Everyone',
        body='Meals, scripture, and support are offered without any precondition of faith, '
             'caste, or background. No one is asked to believe anything to be fed or to be '
             'heard.',
    ),
    Card(
        title='Service Before Sentiment',
        body='Spiritual understanding is measured by what it produces. We judge our work by '
             'meals served, texts distributed, and people genuinely helped.',
    ),
    Card(
        title='Working Through Partners',
        body='We collaborate with temples, schools, agencies, and community organisations '
             'rather than duplicating what already works.',
    ),
    Card(
        title='Accountable Stewardship',
        body='Contributions are directed to the objectives set out in the trust deed, and we '
             'hold ourselves answerable for how they are used.',
    ),
)

#: The inherited Bhaktivinoda archive, linked from /library/.
ARCHIVE_COLLECTIONS: tuple[Card, ...] = (
    Card(title='Books', body='Complete texts and translations, free to read.',
         href='/writings/books/', link_text='Browse Books'),
    Card(title='Articles', body='Essays and commentary on philosophy and practice.',
         href='/writings/articles/', link_text='Browse Articles'),
    Card(title='Songs &amp; Poems', body='Devotional songs and poetry with translation.',
         href='/writings/songs-poems/', link_text='Browse Songs'),
    Card(title='Quotes', body='Selected passages arranged by theme.',
         href='/writings/quotes/', link_text='Browse Quotes'),
    Card(title='Audio', body='Recorded lectures, classes, and kīrtana.',
         href='/audio/', link_text='Listen'),
    Card(title='Photographs', body='A photographic and biographical archive.',
         href='/photos-of-bhaktivinoda-thakura/', link_text='View Archive'),
)

#: Narrative copy for /about-us/. Kept here so the page module stays structural.
ABOUT_STORY: tuple[str, ...] = (
    'Science of Krishna was established as a charitable foundation to carry the teachings '
    'of the Bhagavad Gītā and Śrīmad Bhāgavatam into the practical life of society. The '
    'name reflects a conviction at the centre of our work: that spiritual knowledge is not '
    'sentiment but a precise science of the self, and that it becomes real only when it is '
    'put to use.',
    'That conviction shapes everything the foundation does. The same understanding that '
    'moves us to publish and distribute scripture also moves us to cook meals for those who '
    'have none, to help a temple keep its doors open, and to sit with a person on the worst '
    'day of their life.',
)

ABOUT_GUIDANCE: str = (
    "The foundation's objectives are set out formally in its trust deed and govern how we "
    'choose our work and spend what we are given. They range from the distribution of '
    'scripture to feeding programmes, temple sevā, drug-abuse prevention, counseling, and '
    'institutional partnerships.'
)

#: Shown wherever a person in crisis might be reading.
CRISIS_NOTICE: str = (
    'If you or someone you know is in immediate danger, please contact your local '
    'emergency services or a national crisis helpline without delay.'
)
