# -*- coding: utf-8 -*-
"""The six objectives and three aims set out in the trust deed.

This is canonical legal copy: edit with care, and keep the ``key`` values in
sync with :data:`sok.navigation.PROGRAM_SLUGS`.
"""
from __future__ import annotations

from sok.content.models import Objective

OBJECTIVES: tuple[Objective, ...] = (
    Objective(
        key='scriptural-outreach',
        letter='a',
        title='Spreading the Message of the Scriptures',
        short='To spread the message of scriptures like Bhagavad Gītā, Śrīmad Bhāgavatam, '
              'and other relevant spiritual texts.',
        body='At the heart of the foundation is the distribution of timeless wisdom. We '
             'publish, translate, and freely share the teachings of the Bhagavad Gītā, the '
             'Śrīmad Bhāgavatam, and allied Vaiṣṇava literature, so that anyone — '
             'regardless of background or means — may encounter them.',
    ),
    Objective(
        key='prasadam-distribution',
        letter='b',
        title='Free Meals for the Needy',
        short='To provide free meals to the needy and support feeding programs.',
        body='No one should go hungry. The foundation prepares and distributes sanctified '
             'vegetarian meals, and partners with existing feeding programmes to extend '
             'their reach into the communities that need them most.',
    ),
    Objective(
        key='temple-seva',
        letter='c',
        title='Service to Temples',
        short='To assist temples in their activities like construction, bhaṇḍārā and other '
              'sevās.',
        body='Temples are the cultural and spiritual centres of a community. We assist them'
             ' with construction and restoration, the organisation of bhaṇḍārā and '
             'festivals, and the many quiet sevās that keep their doors open.',
    ),
    Objective(
        key='drug-free-society',
        letter='d',
        title='A Drug-Free Society',
        short='To collaborate with community organisations and law enforcement agencies to '
              'create initiatives aimed at reducing drug usage within the surrounding '
              'society.',
        body='Substance abuse erodes families and futures. Working alongside community '
             'organisations and law enforcement agencies, we develop preventive '
             'initiatives, awareness drives, and pathways to recovery grounded in a higher '
             'purpose.',
    ),
    Objective(
        key='counseling-support',
        letter='e',
        title='Counseling and Crisis Support',
        short='To implement programs, or partner with local agencies, to provide counseling'
              ' services to individuals facing difficult times — with a focus on preventing'
              ' suicide, substance abuse, and other offences.',
        body='Difficult times come to everyone. The foundation implements counseling '
             'programmes and partners with local agencies to reach individuals in crisis, '
             'with particular focus on preventing suicide, substance abuse, and other self-'
             'destructive paths.',
    ),
    Objective(
        key='workshops-partnerships',
        letter='f',
        title='Workshops and Institutional Partnerships',
        short='To establish partnerships with educational institutions and social service '
              'providers, offering workshops, support groups, and resources addressing '
              'mental health, addiction, and societal challenges.',
        body='Lasting change is built through institutions. We partner with schools, '
             'colleges, and social service providers to deliver workshops, host support '
             'groups, and supply resources that address mental health, addiction, and wider'
             ' societal challenges.',
    ),
)

AIMS: tuple[str, ...] = (
    'Foster spiritual growth and understanding among individuals.',
    'Alleviate hunger and poverty by providing nutritious meals to those in need.',
    'Support and strengthen the activities of temples and religious organisations in '
    'promoting spiritual well-being.',
)

#: Fast lookup by objective key.
BY_KEY: dict[str, Objective] = {o.key: o for o in OBJECTIVES}


def objective(key: str) -> Objective:
    """Return the objective for ``key``, raising a helpful error if absent."""
    try:
        return BY_KEY[key]
    except KeyError:
        raise KeyError(
            f"unknown objective {key!r}; expected one of {sorted(BY_KEY)}"
        ) from None
