# -*- coding: utf-8 -*-
"""Long-form copy for each programme page.

Keys match :data:`sok.navigation.PROGRAM_SLUGS`; :func:`sok.content.validate`
asserts the two stay in step.
"""
from __future__ import annotations

from sok.content.models import Program, Section

PROGRAMS: dict[str, Program] = {
    'scriptural-outreach': Program(
        eyebrow='Objective (a)',
        lead='Making the Bhagavad Gītā, the Śrīmad Bhāgavatam, and allied scriptures freely'
             ' available to every seeker.',
        sections=(
            Section(
                heading='What we do',
                body='We publish and distribute scripture in print and digital form, '
                     'maintain a free online library, and host regular classes and reading '
                     'circles. Translations are prepared with fidelity to the original '
                     'Sanskrit and Bengali, accompanied by commentary that makes the text '
                     'approachable to a modern reader.',
            ),
            Section(
                heading='Why it matters',
                body='These texts address the questions that sit underneath every other '
                     'problem the foundation works on — who we are, why we suffer, and what'
                     ' a well-lived life consists of. Every other programme we run rests on'
                     ' this foundation.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'Free distribution of Bhagavad Gītā and Śrīmad Bhāgavatam',
            'An open digital library of scripture and commentary',
            'Weekly classes, reading circles, and discussion groups',
            'Translation of texts into regional languages',
            'Public lectures and seminars on Vaiṣṇava philosophy',
        ),
    ),
    'prasadam-distribution': Program(
        eyebrow='Objective (b)',
        lead='Nutritious, sanctified vegetarian meals offered freely to anyone in need.',
        sections=(
            Section(
                heading='What we do',
                body='The foundation cooks and distributes free vegetarian meals, and '
                     'supports existing feeding programmes with provisions, volunteers, and'
                     ' logistics. Meals are offered without any precondition of belief, '
                     'caste, or background.',
            ),
            Section(
                heading='Why it matters',
                body='Hunger is the most immediate form of poverty. A meal offered with '
                     'care restores dignity as much as it restores the body, and it is the '
                     'most direct way the foundation can serve the society around it.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'Daily and weekly free meal distribution',
            'Support for existing community feeding programmes',
            'Meals during festivals, bhaṇḍārā, and public gatherings',
            'Emergency food relief during crisis and disaster',
            'Provisions and volunteer support for partner kitchens',
        ),
    ),
    'temple-seva': Program(
        eyebrow='Objective (c)',
        lead='Assisting temples with construction, bhaṇḍārā, festivals, and the daily sevās'
             ' that sustain them.',
        sections=(
            Section(
                heading='What we do',
                body='We assist temples with construction and restoration work, help '
                     'organise bhaṇḍārā and festival programmes, and provide the practical '
                     'and financial support that keeps daily worship uninterrupted.',
            ),
            Section(
                heading='Why it matters',
                body="A temple is not only a place of worship — it is a community's "
                     'gathering point, its kitchen, its school, and its refuge. '
                     'Strengthening temples strengthens everything that grows around them.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'Temple construction, repair, and restoration',
            'Organisation and sponsorship of bhaṇḍārā',
            'Festival and utsava programme support',
            'Provision of worship articles and daily necessities',
            'Volunteer sevā for temple maintenance and service',
        ),
    ),
    'drug-free-society': Program(
        eyebrow='Objective (d)',
        lead='Working with community organisations and law enforcement to reduce drug use '
             'in the society around us.',
        sections=(
            Section(
                heading='What we do',
                body='The foundation collaborates with community organisations and law '
                     'enforcement agencies to design and deliver initiatives that reduce '
                     'drug usage — combining awareness, prevention, and a positive '
                     'alternative rooted in spiritual practice.',
            ),
            Section(
                heading='Why it matters',
                body='Addiction rarely begins with a substance; it begins with emptiness. '
                     'Alongside practical prevention work, we offer something to move '
                     'toward: community, purpose, and a way of living that does not require'
                     ' escape.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'Joint initiatives with community organisations and police',
            'Awareness campaigns in schools, colleges, and neighbourhoods',
            'Prevention programmes for at-risk youth',
            'Referral pathways into treatment and recovery',
            'Substance-free community events and gatherings',
        ),
    ),
    'counseling-support': Program(
        eyebrow='Objective (e)',
        lead='Counseling for individuals in crisis, with a focus on preventing suicide, '
             'substance abuse, and self-destructive behaviour.',
        sections=(
            Section(
                heading='What we do',
                body='We implement counseling programmes and partner with qualified local '
                     'agencies to reach individuals facing acute difficulty. Support is '
                     'confidential, offered without judgement, and available regardless of '
                     "a person's faith or background.",
            ),
            Section(
                heading='Why it matters',
                body='People in crisis often fall through every gap at once. A steady, '
                     'available presence at the right moment — someone who listens without '
                     'agenda — can change the direction of a life.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'One-to-one counseling and pastoral support',
            'Partnerships with qualified local counseling agencies',
            'Suicide-prevention awareness and outreach',
            'Support for families affected by addiction',
            'Referral to professional mental-health services',
        ),
        note='If you or someone you know is in immediate danger, please contact your local '
             'emergency services or a national crisis helpline without delay.',
    ),
    'workshops-partnerships': Program(
        eyebrow='Objective (f)',
        lead='Partnering with educational institutions and social service providers to '
             'deliver workshops, support groups, and resources.',
        sections=(
            Section(
                heading='What we do',
                body='The foundation establishes partnerships with schools, colleges, and '
                     'social service providers to offer workshops, host support groups, and'
                     ' supply resources addressing mental health, addiction, and broader '
                     'societal challenges.',
            ),
            Section(
                heading='Why it matters',
                body='Working through institutions multiplies reach and makes the work '
                     'durable. A single workshop can seed a support group that continues '
                     'long after we have left the room.',
            ),
        ),
        list_title='Our activities include',
        items=(
            'Workshops in schools, colleges, and universities',
            'Facilitated support groups for students and families',
            'Resource material on mental health and addiction',
            'Training for teachers, volunteers, and community leaders',
            'Joint programmes with social service providers',
        ),
    ),
}
