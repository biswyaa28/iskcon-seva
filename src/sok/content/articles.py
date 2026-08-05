# -*- coding: utf-8 -*-
"""Library readings: a verbatim scripture passage plus the foundation's commentary.

The quoted scripture is authentic and citable — it is resolved from
``data/sources/gita_arnold.txt`` at build time and verified by
:mod:`sok.checks.quotes`. The surrounding commentary is draft editorial written
to exercise the templates, and is labelled as such on every page.

To add a reading: append a passage in :mod:`sok.content.passages`, add the
article here, then rebuild.
"""
from __future__ import annotations

from sok.content.models import Article, Section

ARTICLES: tuple[Article, ...] = (
    Article(
        slug='why-the-teaching-must-be-retold',
        objective='scriptural-outreach',
        title='Why the Teaching Must Be Retold',
        standfirst='Krishna explains that the knowledge he is giving Arjuna is not new — it'
                   ' was given long ago, and lost. Every generation has to receive it '
                   'again.',
        reading='4 min',
        topic='Scripture',
        passage_index=0,
        body=(
            Section(
                heading='The problem the verse names',
                body='The passage makes an admission that is easy to miss: the teaching had'
                     ' already been given, to Vivaswata, to Manu, to Ikshwaku, down a line '
                     'of kings — and then <em>the truth grew dim and perished</em>. Not '
                     'because it was refuted. Because it stopped being transmitted.',
            ),
            Section(
                heading='Why it matters to this work',
                body='This is the whole argument for scriptural outreach in four words. A '
                     'tradition is not preserved by having once been written down. It '
                     'survives only where someone takes the trouble to hand it on, in a '
                     'language the listener actually speaks, to people who have no '
                     'particular reason to come looking for it.',
            ),
            Section(
                heading='What we do about it',
                body='The foundation prints and distributes the Bhagavad Gītā and Śrīmad '
                     'Bhāgavatam, keeps a free digital library, and runs reading circles '
                     'open to anyone. None of it is complicated. It is simply the work of '
                     'not letting the thread drop again.',
            ),
        ),
    ),
    Article(
        slug='knowledge-is-the-better-gift',
        objective='scriptural-outreach',
        title='Knowledge Is the Better Gift',
        standfirst='On why a text given away costs the giver little and may change the '
                   'receiver entirely.',
        reading='3 min',
        topic='Scripture',
        passage_index=1,
        body=(
            Section(
                heading='A ranking of gifts',
                body='The verse places the gift of knowledge above the gift of wealth, and '
                     "gives the reason plainly: <em>gifts' worth lies in the mind which "
                     'gives, the will that serves</em>. What is given matters less than '
                     'what the giving costs and what it makes possible.',
            ),
            Section(
                heading='The practical consequence',
                body='Food relieves hunger today. A book, if it is the right book and '
                     'reaches the right person, can reorganise a life. The foundation does '
                     'both and does not rank them against each other — but it does explain '
                     'why a charitable trust concerned with feeding people also spends '
                     'effort on printing.',
            ),
            Section(
                heading='How the passage qualifies itself',
                body='Note the conditions attached: such knowledge is gained <em>by '
                     'reverence, by strong search, by humble heed of those who see the '
                     'Truth and teach it</em>. Distribution alone is not enough. Someone '
                     'has to be willing to explain, and someone has to be willing to ask.',
            ),
        ),
    ),
    Article(
        slug='the-three-kinds-of-food',
        objective='prasadam-distribution',
        title='The Three Kinds of Food',
        standfirst='Chapter XVII divides food into three classes by what it does to the '
                   'person who eats it — a passage that shapes how the foundation cooks.',
        reading='4 min',
        topic='Prasadam',
        passage_index=0,
        body=(
            Section(
                heading='What the passage claims',
                body='Food is sorted into three kinds: that which brings <em>force, '
                     'substance, strength, and health, and joy to live</em>; that which '
                     'brings <em>aches and unrests, and burning blood, and grief</em>; and '
                     'food that is stale and spoiled. The claim is that eating is not a '
                     'neutral act — it leaves a residue in the eater.',
            ),
            Section(
                heading='Why a feeding programme should care',
                body='It would be simpler to treat hunger as a calorie problem. This '
                     'passage insists it is not. If food carries a quality, then the '
                     'quality of what is served to someone with no other options matters '
                     'more, not less.',
            ),
            Section(
                heading='How it shapes the kitchen',
                body='The foundation cooks fresh, vegetarian, and without stinting on what '
                     'goes in. Meals are offered to Krishna before being served, which is '
                     'what makes them <em>prasādam</em> — mercy — rather than charity. No '
                     'one receiving a plate is asked to hold any view about that.',
            ),
        ),
    ),
    Article(
        slug='what-makes-a-gift-a-gift',
        objective='prasadam-distribution',
        title='What Makes a Gift a Gift',
        standfirst='Five lines that set an uncomfortably high standard for charitable giving.',
        reading='3 min',
        topic='Prasadam',
        passage_index=1,
        body=(
            Section(
                heading='The definition',
                body='A true gift is given <em>gladly</em>, at the right time and place, to'
                     ' a fit recipient — and crucially, to one <em>who can render nothing '
                     'back</em>. The moment a return is expected, the verse reclassifies '
                     'the act.',
            ),
            Section(
                heading='The two failure modes',
                body='The passage names them precisely. A gift given hoping for return, or '
                     'to serve some end, or handed over grudgingly, is of a lower order. A '
                     'gift <em>flung</em> — at the wrong time, in disdain — <em>doth not '
                     'bless</em>. The food may be identical. The act is not.',
            ),
            Section(
                heading='What this asks of us',
                body='It means the manner of distribution is not a detail. Serving without '
                     'hurry, without a photograph, without requiring gratitude, is not '
                     "politeness laid over the programme — by this passage's standard, it "
                     'is the programme.',
            ),
        ),
    ),
    Article(
        slug='true-religiousness-of-act',
        objective='temple-seva',
        title='True Religiousness of Act',
        standfirst='What the text counts as genuine religious action — and how ordinary the'
                   ' list turns out to be.',
        reading='3 min',
        topic='Seva',
        passage_index=0,
        body=(
            Section(
                heading='An unglamorous list',
                body='Worship of what deserves worship; respect for teachers and elders; '
                     'purity; rectitude; restraint; and <em>not to injure any helpless '
                     'thing</em>. That is the whole of it. There is no mention of scale, '
                     'expense, or visibility.',
            ),
            Section(
                heading='Why temples matter here',
                body='A temple is where these things are practised in public and in '
                     'company. It is also, in most communities, the kitchen, the meeting '
                     'hall, and the place people go when they have nowhere else. Supporting'
                     ' one is not narrowly religious work.',
            ),
            Section(
                heading='What our assistance looks like',
                body='Construction and repair, help with bhaṇḍārā and festivals, worship '
                     'articles, and volunteers for the daily tasks that no one writes '
                     'about. Mostly it is the last category.',
            ),
        ),
    ),
    Article(
        slug='works-not-to-be-abandoned',
        objective='temple-seva',
        title='The Works Not to Be Abandoned',
        standfirst='Even the most renunciate reading of the Gita holds three activities '
                   'back from renunciation.',
        reading='3 min',
        topic='Seva',
        passage_index=1,
        body=(
            Section(
                heading='The exception clause',
                body='Chapter XVIII is largely about giving things up. In the middle of it,'
                     ' three activities are exempted: <em>Worship, Penance, Alms, not to be'
                     ' stayed; nay, to be gladly done</em>. They are called purifying '
                     'waters for true souls.',
            ),
            Section(
                heading='What is actually renounced',
                body='Not the act — the attachment to its result. One keeps working and '
                     'lets go of the outcome. This is a far more demanding instruction than'
                     ' simply stopping.',
            ),
            Section(
                heading='The bearing on temple work',
                body='It is why the foundation treats sevā as ongoing rather than as a '
                     'project with a completion date. Temples need help in the unremarkable'
                     ' years, not only during construction appeals.',
            ),
        ),
    ),
    Article(
        slug='desire-as-the-enemy',
        objective='drug-free-society',
        title='Desire, and the Thing That Pushes',
        standfirst='Arjuna asks why a person does harm they did not intend. The answer is '
                   'the clearest description of compulsion in the text.',
        reading='5 min',
        topic='Prevention',
        passage_index=0,
        body=(
            Section(
                heading='The question behind it',
                body="Arjuna's question is exact: <em>by what force doth man go to his ill,"
                     ' unwilling; as if one pushed him that evil path?</em> He is not '
                     'asking why people choose badly. He is asking about the experience of '
                     'acting against your own intention.',
            ),
            Section(
                heading='The images the answer uses',
                body='Three of them, in order of severity — smoke over fire, rust on a '
                     'mirror, a womb enclosing an unborn child. Obscured, corroded, '
                     'entirely enveloped. Anyone who has watched addiction progress will '
                     'recognise the sequence.',
            ),
            Section(
                heading='Why the passage is not despairing',
                body='It ends with a hierarchy: the senses are strong, the mind stronger, '
                     'the discerning faculty stronger still, and above all of them the '
                     'self. The problem is named as grave and as answerable. That is the '
                     'footing this programme works from.',
            ),
            Section(
                heading='What we do with it',
                body='Prevention work with schools, community organisations, and police; '
                     'awareness campaigns; referral into treatment; and substance-free '
                     'events that give people somewhere to actually go. The text is clear '
                     'that naming the enemy is not the same as defeating it.',
            ),
        ),
    ),
    Article(
        slug='the-three-gates',
        objective='drug-free-society',
        title='The Three Gates',
        standfirst='Lust, wrath, and avarice — named together, and named as doors rather '
                   'than as states.',
        reading='3 min',
        topic='Prevention',
        passage_index=1,
        body=(
            Section(
                heading="Why 'doors'",
                body='The metaphor is deliberate. A door is passed through, usually without'
                     ' ceremony, often without noticing. The verse does not describe ruin '
                     'as a condition one falls into but as somewhere one walks.',
            ),
            Section(
                heading='Three, not one',
                body='Grouping lust with wrath and avarice is the useful part. Programmes '
                     'that treat substance abuse in isolation from anger and from financial'
                     ' desperation tend to find the same person back again.',
            ),
            Section(
                heading='The instruction',
                body='<em>Let a man shun those three</em> — and the verse immediately adds '
                     'that whoever turns aside from all three finds peace. Turning aside is'
                     ' presented as available, which is the premise of any prevention work '
                     'worth funding.',
            ),
        ),
    ),
    Article(
        slug='the-self-as-friend-or-enemy',
        objective='counseling-support',
        title='The Self as Friend or Enemy',
        standfirst='Six lines that describe, without clinical language, what it is to be at'
                   ' war with yourself.',
        reading='4 min',
        topic='Support',
        passage_index=0,
        body=(
            Section(
                heading='The claim',
                body='<em>Let each man raise the Self by Soul, not trample down his '
                     'Self.</em> The same faculty that can lift a person can be turned '
                     'against them. The verse says the self may be its own friend or its '
                     'own foe, and that which one it becomes is not fixed.',
            ),
            Section(
                heading='Why this is the right starting point',
                body='It refuses two easy positions — that a person in crisis is simply '
                     'broken, and that they could stop if they wanted to. It describes a '
                     'relationship that has gone wrong and can be repaired, which is what '
                     'anyone sitting with someone in difficulty is actually trying to do.',
            ),
            Section(
                heading='What follows in practice',
                body='Counseling, pastoral support, partnership with qualified local '
                     'agencies, and referral onward when a situation needs professional '
                     'care. Support is confidential and does not depend on the person '
                     'sharing our beliefs.',
            ),
            Section(
                heading='A necessary note',
                body='This is a text, not a treatment. Where someone is at risk, scripture '
                     'is not a substitute for a crisis service, and we say so.',
            ),
        ),
    ),
    Article(
        slug='who-is-safe-to-confide-in',
        objective='counseling-support',
        title='Who Is Safe to Confide In',
        standfirst='Chapter XII lists the qualities of the devotee. Read differently, it is'
                   ' a description of a person you could tell the truth to.',
        reading='3 min',
        topic='Support',
        passage_index=1,
        body=(
            Section(
                heading='The list',
                body='Hating nothing that lives; compassionate; free of arrogance and of '
                     'self-regard; unchanged by good fortune or bad; patient; contented; '
                     'firm. And then, tellingly: <em>who troubleth not his kind, and is not'
                     ' troubled by them</em>.',
            ),
            Section(
                heading='Why that last line matters',
                body='Someone who is not thrown by what you tell them. Not indifferent — '
                     'the same passage insists on compassion — but steady enough that your '
                     'difficulty does not become their crisis. This is the single most '
                     'useful quality in anyone doing this work.',
            ),
            Section(
                heading='How we try to hold to it',
                body='Volunteers are asked to listen before advising, to keep confidence '
                     'absolutely, and to know the limits of what they are able to help '
                     'with. The list above is the standard, not the achievement.',
            ),
        ),
    ),
    Article(
        slug='equal-grace-to-strangers',
        objective='workshops-partnerships',
        title='Equal Grace to Strangers',
        standfirst='A short passage that rules out choosing who deserves help.',
        reading='3 min',
        topic='Partnership',
        passage_index=0,
        body=(
            Section(
                heading='The catalogue',
                body='<em>Comrades, friends, chance-comers, strangers, lovers, enemies, '
                     'aliens and kinsmen</em> — and then, closing off the last exit, '
                     '<em>loving all alike, evil or good</em>. The list is constructed to '
                     'exhaust every category by which we normally sort people.',
            ),
            Section(
                heading='What it forbids',
                body='Screening. The verse does not permit a version of service that first '
                     'establishes whether the recipient is deserving, or is likely to '
                     'reciprocate, or belongs to us.',
            ),
            Section(
                heading='Why it shapes our partnerships',
                body='We work with schools, colleges, agencies, and community organisations'
                     ' without requiring that they share our position, and we do not make '
                     "our help conditional on anyone's beliefs. That is not diplomacy — it "
                     'is what this passage plainly says.',
            ),
        ),
    ),
    Article(
        slug='your-own-work-imperfectly-done',
        objective='workshops-partnerships',
        title='Your Own Work, Imperfectly Done',
        standfirst='On the discipline of doing what is actually yours to do — including '
                   'knowing when to hand something to someone better placed.',
        reading='3 min',
        topic='Partnership',
        passage_index=1,
        body=(
            Section(
                heading='A counter-intuitive preference',
                body='<em>Better that one do his own task as he may, even though he fail, '
                     'than take tasks not his own, though they seem good.</em> The verse '
                     "prefers imperfect work in one's own place to competent work in "
                     "someone else's.",
            ),
            Section(
                heading='How we read it institutionally',
                body='As an argument against duplication. Where a school, an agency, or '
                     'another organisation is already doing something well, the useful '
                     'contribution is support rather than a parallel programme with our '
                     'name on it.',
            ),
            Section(
                heading='What that looks like',
                body='Workshops delivered inside existing institutions; support groups '
                     'hosted with partners; training for teachers and volunteers; materials'
                     ' others can use without us present. The measure is whether the work '
                     'continues after we leave the room.',
            ),
        ),
    ),
)

#: Distinct topics, in first-appearance order — drives the library filter bar.
TOPICS: tuple[str, ...] = tuple(dict.fromkeys(a.topic for a in ARTICLES))

#: Fast lookup by slug.
BY_SLUG: dict[str, Article] = {a.slug: a for a in ARTICLES}


def for_objective(key: str) -> tuple[Article, ...]:
    """Every reading attached to the given objective, in publication order."""
    return tuple(a for a in ARTICLES if a.objective == key)
